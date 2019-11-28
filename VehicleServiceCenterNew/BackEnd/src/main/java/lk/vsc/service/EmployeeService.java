package lk.vsc.service;

import lk.vsc.entity.Employee;

import java.util.List;

public interface EmployeeService {
    Employee addEmployee(Employee employee);
    void deleteEmployee(int employee);
    Employee updateEmployee(Employee employee);
    List<Employee> searchByEmployeeNumber(String employeeId);

    List<Employee> getAllEmployee();
}
