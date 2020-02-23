package lk.vsc.controller;



import lk.vsc.entity.Customer;
import lk.vsc.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/CustomerController")
public class CustomerController {


    @Autowired
    private CustomerService customerService;

    @PostMapping(value = "/addCustomer")
    public Customer addCustomer(@RequestBody Customer customer){
        return customerService.addCustomer(customer);
    }

    @GetMapping(value ="/getAllCustomer")
    public List<Customer> getAllVehicle(){

        return customerService.getAllCustomers();
    }


    @GetMapping(value = "/searchByCustomerName/{name}")
    public List<Customer> searchByCustomerName(@PathVariable String name){

        return customerService.searchByCustomerName(name);

    }


    @GetMapping(value = "/checkCustomer/{nic}")
    public String checkCustomer(@PathVariable String nic){

        System.out.println("Gnanod"+customerService.checkCustomer(nic));
        return customerService.checkCustomer(nic);

    }

    @DeleteMapping("/deleteCustomer/{nic}")
    void deleteCustomer(@PathVariable String nic) {
        customerService.deleteCustomer(nic);
    }

    //@PutMapping("/updateCustomer/{nic}")
    @PostMapping(value = "/updateCustomer")
    public Customer updateCustomer(@RequestBody Customer customer){

        return customerService.updateCustomer(customer);

    }
}
