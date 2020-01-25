package lk.vsc.repository;
import lk.vsc.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServicesRepository extends JpaRepository<Services,Integer> {
    @Query(value = "from Services where serviceId=?1")
    Services searchByServicesNumber(int employeeId);

    @Query(value = "select serviceId, serviceName,serviceDesc, vehicletype,servicePrice from Services where vehicletype =:vehicleType")
    List<Object[]> getAllDetails(@Param("vehicleType") String vehicleType);

    @Query(value = "select serviceDesc from Services where serviceDesc like CONCAT('%',:searchByServiceName,'%')")
    List<Object[]> getServiceDesc(@Param("searchByServiceName") String searchByServiceName);

    @Query(value = "from Services where serviceId=?1")
    Services getServicebyId(int serviceId);

    @Query(value = "select serviceId, serviceName,serviceDesc, vehicletype,servicePrice from Services")
    List<Object[]> getAllSerivce();

    @Query(value = "select j.date,j.serviceId,j.detailJobAmount,j.lubeJobAmount,j.serviceAmount,j.presentOdoMeter,j.jobID from JobOrder j , Vehicle v where v.vehicleId = j.vehicle.vehicleId and v.vehicleNumber =:vehNumber")
    List<Object[]> getAllVehicleHistoryByUsingVehNumber(@Param("vehNumber") String vehNumber);

    @Query(value = "SELECT service_name FROM services LEFT JOIN service_job_details ON services.service_id = service_job_details.service_id where service_job_id=:serviceID",nativeQuery = true)
    List<Object[]> viewServiceForThisJob(@Param("serviceID")String serviceID);

    @Query(value = "select i.itemId,j.qty,i.itemQuantityType from Item i , JobOrderItemDetails j where i.itemId = j.item.itemId and j.jobOrder.jobID =:jobId")
    List<Object[]> viewItemDetails(@Param("jobId")int jobId);
//    select service_desc from services where service_name='Wax'


}

