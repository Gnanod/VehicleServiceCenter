package lk.vsc.controller;

import lk.vsc.entity.Employee;
import lk.vsc.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "EmployeeController")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(value = "addEmployee")
    public Employee addEmployee(@RequestBody Employee employee){

        return employeeService.addEmployee(employee);

    }

    @DeleteMapping("/deleteEmployee/{id}")
    public void deleteEmployee(@PathVariable Employee employee){

         employeeService.deleteEmployee(employee);

    }

}
