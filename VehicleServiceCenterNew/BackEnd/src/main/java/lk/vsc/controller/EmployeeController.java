package lk.vsc.controller;

import lk.vsc.entity.Employee;
import lk.vsc.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void deleteEmployee(@PathVariable int id){

         employeeService.deleteEmployee(id);

    }

    @PostMapping(value = "/updateEmployee")
    public Employee updateEmployee(@RequestBody Employee employee){

        return employeeService.updateEmployee(employee);

    }


    @GetMapping(value = "/searchByEmployeeNumber/{employeeId}")
    public List<Employee> searchByEmployeeNumber(@PathVariable String employeeId){
        return employeeService.searchByEmployeeNumber(employeeId);
    }

    @GetMapping(value = "/getAllEmplyess")
    public List<Employee> getAllEmployee(){
        return employeeService.getAllEmployee();
    }

}
