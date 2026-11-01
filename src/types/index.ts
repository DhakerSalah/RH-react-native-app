export type UserRole = "hr" | "employee";
export type RequestStatus = "Pending" | "Approved" | "Rejected";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  position: string;
  status: "Active" | "Inactive";
};

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: RequestStatus;
};

export type Equipment = {
  id: string;
  name: string;
  category: string;
  assignedTo: string;
  status: "Assigned" | "Available" | "Maintenance";
};

export type Payslip = {
  id: string;
  month: string;
  year: number;
  netPay: number;
  baseSalary: number;
  bonus: number;
  deductions: number;
};
