package lk.vsc.repository;


import lk.vsc.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
    @Query(value = "from Employee where employeeId=?1")
    Employee searchByEmployeeNumber(int employeeId);

}

