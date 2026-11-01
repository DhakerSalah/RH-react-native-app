import React, { createContext, useContext, useState } from "react";

import {
  demoPayslips,
  initialEmployees,
  initialEquipment,
  initialLeaveRequests,
} from "../data/mockData";

import {
  Employee,
  Equipment,
  LeaveRequest,
  Payslip,
  RequestStatus,
} from "../types";

import { useAuth } from "../auth/useAuth";

type NewEmployee = Omit<Employee, "id" | "status" | "role">;

type NewLeaveRequest = Omit<
  LeaveRequest,
  "id" | "employeeId" | "employeeName" | "status"
>;

type AppContextValue = {
  employees: Employee[];
  leaveRequests: LeaveRequest[];
  equipment: Equipment[];
  payslips: Payslip[];
  leaveBalance: number;

  addEmployee: (employee: NewEmployee) => void;
  addLeaveRequest: (request: NewLeaveRequest) => boolean;

  updateLeaveStatus: (id: string, status: RequestStatus) => boolean;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(initialLeaveRequests);

  const [equipment] = useState<Equipment[]>(initialEquipment);

  // This represents the employee's remaining annual leave balance.
  const [leaveBalance, setLeaveBalance] = useState(18);

  const addEmployee = (employee: NewEmployee) => {
    setEmployees((current) => [
      {
        ...employee,
        id: `emp-${Date.now()}`,
        role: "employee",
        status: "Active",
      },
      ...current,
    ]);
  };

  const addLeaveRequest = (request: NewLeaveRequest): boolean => {
    console.log("Current authenticated user:", user);
    console.log("Leave request:", request);

    if (!user) {
      console.log("ERROR: No authenticated user found.");
      return false;
    }

    if (user.role !== "employee") {
      console.log("ERROR: User role is:", user.role);
      return false;
    }

    if (!Number.isInteger(request.days) || request.days <= 0) {
      console.log("ERROR: Invalid number of leave days:", request.days);
      return false;
    }

    const newRequest: LeaveRequest = {
      ...request,
      id: `leave-${Date.now()}`,
      employeeId: user.id,
      employeeName: user.name,
      status: "Pending",
    };

    setLeaveRequests((current) => [newRequest, ...current]);

    console.log("SUCCESS: Leave request created:", newRequest);

    return true;
  };

  const updateLeaveStatus = (id: string, status: RequestStatus): boolean => {
    const request = leaveRequests.find((item) => item.id === id);

    // Only pending requests can be processed.
    if (!request || request.status !== "Pending") {
      return false;
    }

    const isAnnualLeave = request.type.toLowerCase() === "annual leave";

    // Check the balance before approving annual leave.
    if (status === "Approved" && isAnnualLeave && request.days > leaveBalance) {
      return false;
    }

    setLeaveRequests((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    // Deduct annual leave only when the request is approved.
    // Sick leave and rejected requests do not affect the balance.
    if (status === "Approved" && isAnnualLeave) {
      setLeaveBalance((current) => Math.max(0, current - request.days));
    }

    return true;
  };

  const value: AppContextValue = {
    employees,
    leaveRequests,
    equipment,
    payslips: demoPayslips,
    leaveBalance,
    addEmployee,
    addLeaveRequest,
    updateLeaveStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
