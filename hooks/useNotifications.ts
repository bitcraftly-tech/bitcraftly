"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { readTenantSlugFromCookie } from "@/hooks/useTenant";
import { apiClient } from "@/lib/api-client";

export type NotificationItem = {
  id: number;
  tenant_id: number | null;
  type: string;
  title: string;
  message: string;
  link: string | null;
  icon: string | null;
  is_read: boolean;
  created_at: string;
  read_at: string | null;
};

type NotificationsResponse = {
  unread_count: number;
  items: NotificationItem[];
};

type NotificationCreatedEvent = {
  type: "notification.created";
  notification: NotificationItem;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export function useNotificationsQuery() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => (await apiClient.get<NotificationsResponse>("/api/notifications")).data,
  });
}

export function useMarkNotificationReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId: number) =>
      (await apiClient.post<NotificationItem>(`/api/notifications/${notificationId}/read`)).data,
    onSuccess: (updated) => {
      queryClient.setQueryData<NotificationsResponse | undefined>(["notifications"], (previous) => {
        if (!previous) return previous;
        const nextItems = previous.items.map((item) => (item.id === updated.id ? { ...item, ...updated } : item));
        return {
          unread_count: nextItems.filter((item) => !item.is_read).length,
          items: nextItems,
        };
      });
    },
  });
}

export function useMarkAllNotificationsReadMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => (await apiClient.post<{ updated: number }>("/api/notifications/read-all")).data,
    onSuccess: () => {
      queryClient.setQueryData<NotificationsResponse | undefined>(["notifications"], (previous) => {
        if (!previous) return previous;
        const now = new Date().toISOString();
        const nextItems = previous.items.map((item) => ({ ...item, is_read: true, read_at: item.read_at ?? now }));
        return {
          unread_count: 0,
          items: nextItems,
        };
      });
    },
  });
}

export function useNotificationSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const protocol = API_BASE_URL.startsWith("https") ? "wss" : "ws";
    const wsBase = API_BASE_URL.replace(/^https?/, protocol);
    const slug = readTenantSlugFromCookie();
    const ws = new WebSocket(`${wsBase}/api/notifications/ws${slug ? `?tenant=${encodeURIComponent(slug)}` : ""}`);

    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send("ping");
      }
    }, 20000);

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as NotificationCreatedEvent;
        if (payload.type !== "notification.created") return;
        queryClient.setQueryData<NotificationsResponse | undefined>(["notifications"], (previous) => {
          if (!previous) {
            return { unread_count: 1, items: [payload.notification] };
          }
          const exists = previous.items.some((item) => item.id === payload.notification.id);
          if (exists) return previous;
          const nextItems = [payload.notification, ...previous.items];
          return {
            unread_count: nextItems.filter((item) => !item.is_read).length,
            items: nextItems,
          };
        });
      } catch {
        // Ignore malformed ws payloads.
      }
    };

    return () => {
      clearInterval(heartbeat);
      ws.close();
    };
  }, [queryClient]);
}
