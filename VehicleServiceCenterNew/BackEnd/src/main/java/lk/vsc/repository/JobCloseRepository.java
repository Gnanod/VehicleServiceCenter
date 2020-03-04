package lk.vsc.repository;

import lk.vsc.entity.JobClose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobCloseRepository extends JpaRepository<JobClose,Integer> {

    @Query(value = "from JobClose  where  serviceId=?1 ")
    JobClose searchServiceAndItemDetailsAmountByServiceId(String serviceId);

    @Query(value="from JobClose  where  serviceId=?1")
    JobClose searchPreviousJobClose(String serviceId);

    @Modifying(clearAutomatically = true)
    @Query(value = "update job_close set item_amount=:itemAmount ,service_amount=:serviceAmount where job_close_id=:jobCloseId",nativeQuery = true)
    void updateJobClose(@Param("itemAmount")double itemAmount,@Param("serviceAmount") double serviceAmount,@Param("jobCloseId") int jobCloseId);

    @Query(value = "select item_item_id from job_order_item_details j where j.job_order_jobid =:jobId and re_open_status='First' ",nativeQuery = true)
    List<Object[]> currentItemAccordingToJoborderId(@Param("jobId")int jobId);
}
