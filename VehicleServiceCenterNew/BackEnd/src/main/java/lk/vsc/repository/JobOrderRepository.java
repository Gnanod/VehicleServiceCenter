package lk.vsc.repository;

import lk.vsc.entity.Customer;
import lk.vsc.entity.Item;
import lk.vsc.entity.JobOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobOrderRepository extends JpaRepository<JobOrder,Integer> {


        @Query(value = "select i.itemName  from Item i , MakeModel m , MakeModelDetails mm  where m.makeModelId= mm.makeModel.makeModelId and  i.itemId = mm.item.itemId and  i.itemName like CONCAT('%',:itemName,'%') and  m.makeName=:makeName and m.modelName=:modelName")
        List<Object []> getItemsForJobOrder(@Param("itemName") String itemName,@Param("makeName") String makeName,@Param("modelName") String modelName); //like CONCAT('%',:itemName,'%')

    @Query(value = "select quantityOfPrice,itemId from Item where itemName =:itemName")
    List<Object[]> searchUnitPrice(@Param("itemName")String itemName);
}
