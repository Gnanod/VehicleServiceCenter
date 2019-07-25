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
    public Customer searchByCustomerName(@PathVariable String name){
        
        return customerService.searchByCustomerName(name);
        
    }


    @DeleteMapping("/deleteCustomer/{nic}")
    void deleteCustomer(@PathVariable String nic) {
        customerService.deleteCustomer(nic);
    }
    
    //@PutMapping("/updateCustomer/{nic}")
    @PostMapping(value = "/updateCustomer")
    public Customer updateCustomer(@RequestBody Customer customer){

//        System.out.println("Nicccc"+nic);
//        Customer  cus = customerService.findByCustomerId(nic);
//        
//        
//        cus.setAddress(customer.getAddress());
//        cus.setBirthday(customer.getBirthday());
//        cus.setEmail(customer.getEmail());
//        cus.setFirstName(customer.getFirstName());
//        cus.setLastName(customer.getLastName());
//        cus.setPhoneNumber(customer.getPhoneNumber());
        
        return customerService.updateCustomer(customer);
        
    }
}
