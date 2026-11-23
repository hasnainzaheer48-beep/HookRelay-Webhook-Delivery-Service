export interface EndpointInterface {
  id: string;
  url: string;
  status: "active" | "paused" | "disabled"
  rateLimitPerSec: number;
  createdAt: Date; 
  updatedAt: Date; 
  userId: string;
  description: string | null;
  secret: string;
  eventTypes: string[];
  disabledReason: string | null;
}