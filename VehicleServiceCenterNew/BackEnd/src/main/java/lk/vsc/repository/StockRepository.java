package lk.vsc.repository;

import lk.vsc.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock,Integer> {

//    @Query(value = "select i.itemName,mm.makeName,mm.modelName,i.quantityOnHand from Item i , MakeModelDetails m , MakeModel mm where i.itemId = m.item.itemId and mm.makeModelId= m.makeModel.makeModelId and i.quantityOnHand< m.stockLevel ")
    @Query(value ="select i.itemName,m.makeName,m.modelName,i.quantityOnHand from Item i,MakeModel m, MakeModelDetails mm   where i.itemId = mm.item.itemId and m.makeModelId = mm.makeModel.makeModelId and i.quantityOnHand < i.stockLevel")
    List<Object[]> getLowStockLevelReport();


//    select i.itemName,m.makeName,m.modelName,i.quantityOnHand from Item i,MakeModel m, MakeModelDetails mm
//    where i.itemId = mm.item.itemId and m.makeModelId = mm.makeModel.makeModelId
//    and i.quantityOnHand < i.stockLevel
//    i.item_id = m. and mm.make_model_id= m.make_model_make_model_id and


//    select i.item_name,m.make_name,model_name,i. quantity_on_hand from item i,make_model m, make_model_details mm
//    where i.item_id = mm.item_item_id and m.make_model_id = mm.make_model_make_model_id
//    and i.quantity_on_hand < i.stock_level


}
