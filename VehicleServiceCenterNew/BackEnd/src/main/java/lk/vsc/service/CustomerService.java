package lk.vsc.service;

import lk.vsc.entity.Customer;

import java.util.List;

public interface CustomerService {

    Customer addCustomer(Customer customer);

    List<Customer> getAllCustomers();

    List<Customer> searchByCustomerName(String name);

    void deleteCustomer(String nic);

    Customer updateCustomer(Customer customer);

    Customer findByCustomerId(String nic);

    String getResult();

    String checkCustomer(String nic);
}
