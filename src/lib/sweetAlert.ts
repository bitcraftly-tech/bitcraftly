'use client';

import Swal from 'sweetalert2';

export type FeedbackModalVariant = 'success' | 'error' | 'warning' | 'info';

const MODAL_TITLES: Record<FeedbackModalVariant, string> = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Information',
};

const CONFIRM_COLORS: Record<FeedbackModalVariant, string> = {
  success: '#2B5CE6',
  error: '#d33',
  warning: '#d97706',
  info: '#2B5CE6',
};

async function showFeedbackModal(variant: FeedbackModalVariant, message: string, title?: string) {
  await Swal.fire({
    icon: variant,
    title: title ?? MODAL_TITLES[variant],
    text: message,
    confirmButtonText: 'OK',
    confirmButtonColor: CONFIRM_COLORS[variant],
  });
}

export async function showSuccessAlert(message: string, title = 'Success') {
  await showFeedbackModal('success', message, title);
}

export async function showErrorAlert(message: string, title = 'Error') {
  await showFeedbackModal('error', message, title);
}

export async function showWarningAlert(message: string, title = 'Warning') {
  await showFeedbackModal('warning', message, title);
}

export async function showInfoAlert(message: string, title = 'Information') {
  await showFeedbackModal('info', message, title);
}

/** Non-blocking centered feedback for event handlers and mutation callbacks. */
export function showFeedbackAlert(variant: FeedbackModalVariant, message: string, title?: string) {
  void showFeedbackModal(variant, message, title);
}
