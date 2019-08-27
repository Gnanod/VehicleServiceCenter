package lk.vsc.repository;

import lk.vsc.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock,Integer> {

    @Query(value = "select i.itemName,mm.makeName,mm.modelName,i.quantityOnHand from Item i , MakeModelDetails m , MakeModel mm where i.itemId = m.item.itemId && mm.make_model_id ")
    List<Object[]> getLowStockLevelReport();

//    i.item_id = m. and mm.make_model_id= m.make_model_make_model_id and
}
