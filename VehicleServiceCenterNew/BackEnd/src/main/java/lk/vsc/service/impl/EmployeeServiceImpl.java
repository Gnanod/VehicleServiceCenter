package lk.vsc.service.impl;

import lk.vsc.entity.Employee;
import lk.vsc.repository.EmployeeRepository;
import lk.vsc.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee addEmployee(Employee employee) {

        return employeeRepository.save(employee);
    }

    @Override
    public void deleteEmployee(int employee) {
        employeeRepository.deleteById(employee);
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee searchByEmployeeNumber(int employeeId) {

        return employeeRepository.searchByEmployeeNumber(employeeId);
    }


}