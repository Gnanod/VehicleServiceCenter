package lk.vsc.repository;

import lk.vsc.entity.JobOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobOrderRepository extends JpaRepository<JobOrder,Integer> {


//    @Query(value = "select i.itemName,i.itemId,i.quantityOnHand,i.quantityOfPrice,i.stockLevel,i.itemQuantityType  from Item i , MakeModel m , MakeModelDetails mm  where m.makeModelId= mm.makeModel.makeModelId and  i.itemId = mm.item.itemId and  i.itemId like CONCAT('%',:itemName,'%') and  m.makeName=:makeName and m.modelName=:modelName")
    @Query(value = "select i.itemName,i.itemId,i.quantityOnHand,i.quantityOfPrice,i.stockLevel,i.itemQuantityType  from Item i , MakeModel m , MakeModelDetails mm  where m.makeModelId= mm.makeModel.makeModelId and  i.itemId = mm.item.itemId and  i.itemId =:itemName and  m.makeName=:makeName and m.modelName=:modelName")
    List<Object []> getItemsForJobOrder(@Param("itemName") String itemName,@Param("makeName") String makeName,@Param("modelName") String modelName); //like CONCAT('%',:itemName,'%')

    @Query(value = "select quantityOfPrice,itemId,itemName,quantityOnHand,stockLevel,itemQuantityType from Item where itemName =:itemName")
    List<Object[]> searchUnitPrice(@Param("itemName")String itemName);

    @Query(value = "select SUM(j.payment) from  final_invoice_payment j where CURDATE()=date",nativeQuery = true)
    Object getTotalSales();

    @Query(value = "select COUNT(service_job_id) from  service_job j where CURDATE()=date and job_status='Job Closed'",nativeQuery = true)
    Object getTodayJobCount();

    @Query(value = "select SUM(j.payment) from final_invoice_payment j where MONTH(CURDATE())=MONTH(date);",nativeQuery = true)
    Object getMonthlyTotalSales();

    @Query(value = "from JobOrder  where  serviceId=?1")
    JobOrder getJobOrder(String serviceId);


    @Query(value = "select jobid,detail_job_amount,lube_job_amount,present_odo_meter from job_order where service_Id=:serviceId" ,nativeQuery = true)
    List<Object[]> checkJobOrderIsIn(@Param("serviceId")String serviceId);

    @Modifying(clearAutomatically = true)
    @Query(value = "update job_order set detail_job_amount=:detail_job_amount,lube_job_amount=:lube_job_amount,present_odo_meter=:present_odo_meter where jobid=:jobid",nativeQuery = true)
    int updateJobOrder(@Param("jobid")int jobid,@Param("detail_job_amount") double detail_job_amount,@Param("lube_job_amount") double lube_job_amount,@Param("present_odo_meter") String present_odo_meter);
}
