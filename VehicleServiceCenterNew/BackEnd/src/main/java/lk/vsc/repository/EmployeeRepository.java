package lk.vsc.repository;


import lk.vsc.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
    @Query(value = "from Employee where firstName=?1")
    List<Employee> searchByEmployeeNumber(String employeeId);

}

