package lk.vsc.repository;

import lk.vsc.entity.ServiceJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ServiceJobRepository extends JpaRepository<ServiceJob,String> {

    @Query(value = " from ServiceJob s where serviceJobId = :id and jobStatus='Job Open'")
    ServiceJob getDetailsAccordingToServiceId(@Param("id") String id);

    @Query(value = "select serviceId from JobOrder where vehicle.vehicleId= :vehicleId and paymentType ='Credit Payment'")
    Object serchPreviousJobs(@Param("vehicleId")int vehicleId);

    @Modifying(clearAutomatically = true)
    @Query(value = "update service_job_details set job_status=:job_status where servicedetailsid=:servicedetailsID",nativeQuery = true)
    void updateDetails(@Param("servicedetailsID")int servicedetailsID,@Param("job_status") String job_status);

    @Modifying(clearAutomatically = true)
    @Query(value = "update service_job set job_status='Job Closed' where service_job_id=:serviceId",nativeQuery = true)
    int updateServiceJobStatus(@Param("serviceId")String serviceId);

    @Query(value = " from ServiceJob s where serviceJobId = :id ")
    ServiceJob getDetailsAccordingToServiceIdReOpen(@Param("id")String id);
}
