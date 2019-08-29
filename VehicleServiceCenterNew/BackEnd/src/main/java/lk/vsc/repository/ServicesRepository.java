package lk.vsc.repository;
import lk.vsc.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ServicesRepository extends JpaRepository<Services,Integer> {
    @Query(value = "from Services where serviceId=?1")
    Services searchByServicesNumber(int employeeId);

}

