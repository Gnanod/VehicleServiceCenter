package lk.vsc.repository;
import lk.vsc.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServicesRepository extends JpaRepository<Services,Integer> {
    @Query(value = "from Services where serviceId=?1")
    Services searchByServicesNumber(int employeeId);

    @Query(value = "select serviceId, serviceName,serviceDesc, vehicletype,servicePrice from Services")
    List<Object[]> getAllDetails();

    @Query(value = "select serviceDesc from Services where serviceDesc like CONCAT('%',:searchByServiceName,'%')")
    List<Object[]> getServiceDesc(@Param("searchByServiceName") String searchByServiceName);

    @Query(value = "from Services where serviceId=?1")
    Services getServicebyId(int serviceId);

//    select service_desc from services where service_name='Wax'
}

