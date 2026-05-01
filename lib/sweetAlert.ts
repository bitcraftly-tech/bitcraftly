"use client";

import Swal from "sweetalert2";

export async function showSuccessAlert(message: string, title = "Success") {
  await Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonColor: "#2B5CE6",
  });
}

export async function showErrorAlert(message: string, title = "Error") {
  await Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#d33",
  });
}
