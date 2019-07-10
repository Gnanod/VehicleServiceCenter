package lk.vsc.service;

import lk.vsc.entity.Customer;
import lk.vsc.entity.Vehicle;

import java.util.List;

public interface CustomerService {
    
    Customer addCustomer(Customer customer);

    List<Customer> getAllCustomers();

    Customer searchByCustomerName(String name);

    void deleteCustomer(String nic);

    Customer updateCustomer(Customer customer);

    Customer findByCustomerId(String nic);
}
