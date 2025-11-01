import type { User, UserRole } from "./types"

// Mock authentication - in production, use proper auth
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    role: "admin",
    name: "Admin User",
  },
  {
    id: "2",
    email: "engineer@example.com",
    role: "engineer",
    name: "Engineering User",
  },
  {
    id: "3",
    email: "viewer@example.com",
    role: "viewer",
    name: "Viewer User",
  },
]

export function getCurrentUser(): User {
  // For demo purposes, return engineer user
  // In production, this would check session/JWT
  return MOCK_USERS[1]
}

export function hasPermission(user: User, action: string): boolean {
  const permissions: Record<UserRole, string[]> = {
    viewer: ["read:metrics", "read:traces"],
    engineer: ["read:metrics", "read:traces", "write:annotations", "read:anomalies"],
    admin: ["read:metrics", "read:traces", "write:annotations", "read:anomalies", "write:config", "manage:users"],
  }

  return permissions[user.role]?.includes(action) ?? false
}

export function canAccessService(user: User, serviceName: string): boolean {
  // Viewers can only access certain services
  if (user.role === "viewer") {
    const allowedServices = ["api-gateway", "user-service", "search-service"]
    return allowedServices.includes(serviceName)
  }

  return true
}
