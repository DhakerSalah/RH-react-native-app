import React, { createContext, useContext, useMemo, useState } from "react";
import {
  DEMO_EMPLOYEE_ID,
  demoPayslips,
  initialEmployees,
  initialEquipment,
  initialLeaveRequests,
} from "../data/mockData";
import {
  Equipment,
  LeaveRequest,
  Payslip,
  RequestStatus,
  User,
  UserRole,
} from "../types";

type AppContextValue = {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  employees: User[];
  leaveRequests: LeaveRequest[];
  equipment: Equipment[];
  payslips: Payslip[];
  leaveBalance: number;
  addEmployee: (employee: Omit<User, "id" | "status">) => void;
  addLeaveRequest: (
    request: Omit<
      LeaveRequest,
      "id" | "employeeId" | "employeeName" | "status"
    >,
  ) => void;
  updateLeaveStatus: (id: string, status: RequestStatus) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [employees, setEmployees] = useState<User[]>(initialEmployees);
  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(initialLeaveRequests);
  const [equipment] = useState<Equipment[]>(initialEquipment);
  const [leaveBalance, setLeaveBalance] = useState(18);

  const addEmployee: AppContextValue["addEmployee"] = (employee) => {
    setEmployees((current) => [
      { ...employee, id: `emp-${Date.now()}`, status: "Active" },
      ...current,
    ]);
  };

  const addLeaveRequest: AppContextValue["addLeaveRequest"] = (request) => {
    const employee = employees.find((item) => item.id === DEMO_EMPLOYEE_ID);
    setLeaveRequests((current) => [
      {
        ...request,
        id: `leave-${Date.now()}`,
        employeeId: DEMO_EMPLOYEE_ID,
        employeeName: employee?.name ?? "Amal Ben Salem",
        status: "Pending",
      },
      ...current,
    ]);
  };

  const updateLeaveStatus: AppContextValue["updateLeaveStatus"] = (
    id,
    status,
  ) => {
    const request = leaveRequests.find((item) => item.id === id);
    if (!request || request.status !== "Pending") return;
    setLeaveRequests((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    if (status === "Approved" && request.employeeId === DEMO_EMPLOYEE_ID) {
      setLeaveBalance((current) => Math.max(0, current - request.days));
    }
  };

  const value = useMemo(
    () => ({
      role,
      setRole,
      employees,
      leaveRequests,
      equipment,
      payslips: demoPayslips,
      leaveBalance,
      addEmployee,
      addLeaveRequest,
      updateLeaveStatus,
    }),
    [role, employees, leaveRequests, equipment, leaveBalance],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
