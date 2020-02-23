package lk.vsc.repository;

import lk.vsc.entity.JobOrderItemDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobOrderItemDetailsRepository extends JpaRepository<JobOrderItemDetails,Integer> {

    @Query(value = "from JobOrderItemDetails where jobOrderServiceDetails =:id")
    JobOrderItemDetails getJobOrderDetailsAccordingToId(@Param("id")int id);

    @Modifying(clearAutomatically = true)
    @Query(value = "update job_order_item_details set qty=:qty ,item_status=:itemStatus ,price=:price where job_order_service_details=:jobOrderServiceDetails",nativeQuery = true)
    void updateDetails(@Param("jobOrderServiceDetails")int jobOrderServiceDetails,@Param("qty") double qty,@Param("itemStatus") String itemStatus,@Param("price") double price);

}
