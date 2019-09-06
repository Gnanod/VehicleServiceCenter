package lk.vsc.service;

import lk.vsc.entity.Employee;

public interface EmployeeService {
    Employee addEmployee(Employee employee);
    void deleteEmployee(int employee);
    Employee updateEmployee(Employee employee);
    Employee searchByEmployeeNumber(String employeeId);
}
