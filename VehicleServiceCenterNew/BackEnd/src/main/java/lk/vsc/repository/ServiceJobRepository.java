package lk.vsc.repository;

import lk.vsc.entity.JobOrder;
import lk.vsc.entity.ServiceJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceJobRepository extends JpaRepository<ServiceJob,Integer> {

    @Query(value = " from ServiceJob s where serviceJobId = :id ")
    ServiceJob getDetailsAccordingToServiceId(@Param("id") String id);

    @Query(value = "select serviceId from JobOrder where vehicle.vehicleId= :vehicleId and paymentType ='Credit'")
    Object serchPreviousJobs(@Param("vehicleId")int vehicleId);
}
