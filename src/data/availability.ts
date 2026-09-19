export interface Availability {
  open: boolean;
  label: string;
  detail?: string;
}

export const availability: Availability = {
  open: true,
  label: "Open to opportunities",
  detail: "Available for freelance and full-time roles",
};
