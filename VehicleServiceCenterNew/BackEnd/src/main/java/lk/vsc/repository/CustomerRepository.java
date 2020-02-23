package lk.vsc.repository;


import lk.vsc.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer,String> {

    @Query(value = "from Customer  where first_name Like CONCAT('%',:customerName,'%')")
    List<Customer> searchByCustomerName(@Param("customerName")String customerName);

    @Query(value = "from Customer  where  nic=?1")
    Customer findCustomerDetails(String nic);

    @Query(value = " select nic from customer order by 1 desc limit 1",nativeQuery = true)
    Object getLastId();

    @Query(value = "select nic from Customer  where  nic=?1")
    Object checkCustomer(String nic);
}
