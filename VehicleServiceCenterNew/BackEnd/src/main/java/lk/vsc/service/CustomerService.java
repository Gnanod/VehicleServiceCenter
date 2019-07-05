package lk.vsc.service;

import lk.vsc.entity.Customer;
import lk.vsc.entity.Vehicle;

import java.util.List;

public interface CustomerService {
    
    Customer addCustomer(Customer customer);

    List<Customer> getAllCustomers();
}