package lk.vsc.repository;

import lk.vsc.entity.JobOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobOrderRepository extends JpaRepository<JobOrder,Integer> {


//    @Query(value = "select i.itemName,i.itemId,i.quantityOnHand,i.quantityOfPrice,i.stockLevel,i.itemQuantityType  from Item i , MakeModel m , MakeModelDetails mm  where m.makeModelId= mm.makeModel.makeModelId and  i.itemId = mm.item.itemId and  i.itemId like CONCAT('%',:itemName,'%') and  m.makeName=:makeName and m.modelName=:modelName")
    @Query(value = "select i.itemName,i.itemId,i.quantityOnHand,i.quantityOfPrice,i.stockLevel,i.itemQuantityType  from Item i , MakeModel m , MakeModelDetails mm  where m.makeModelId= mm.makeModel.makeModelId and  i.itemId = mm.item.itemId and  i.itemId =:itemName and  m.makeName=:makeName and m.modelName=:modelName")
    List<Object []> getItemsForJobOrder(@Param("itemName") String itemName,@Param("makeName") String makeName,@Param("modelName") String modelName); //like CONCAT('%',:itemName,'%')

    @Query(value = "select quantityOfPrice,itemId,itemName,quantityOnHand,stockLevel,itemQuantityType from Item where itemName =:itemName")
    List<Object[]> searchUnitPrice(@Param("itemName")String itemName);

    @Query(value = "select SUM(j.payment) from  job_order_payment j where CURDATE()=date",nativeQuery = true)
    Object getTotalSales();

    @Query(value = "select COUNT(jobid) from  job_order j where CURDATE()=date",nativeQuery = true)
    Object getTodayJobCount();

    @Query(value = "select SUM(j.payment) from job_order_payment j where MONTH(CURDATE())=MONTH(date);",nativeQuery = true)
    Object getMonthlyTotalSales();

    @Query(value = "from JobOrder  where  serviceId=?1")
    JobOrder getJobOrder(String serviceId);
}
