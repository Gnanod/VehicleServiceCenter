package lk.vsc.repository;

import lk.vsc.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item,Integer> {

    @Query(value = "from Item where itemName Like CONCAT('%',?1,'%')")
    Item getItemNames(String itemName);

    @Query(value = "select itemName,itemId,quantityOnHand,stockLevel,itemQuantityType from Item where itemId =:itemId")
    List<Object [] > getItemsToArray(@Param("itemId")String itemId);

    //@Query(value = "select quantityOnHand from Item where itemId Like CONCAT('%',:itemId,'%')")
    @Query(value = "select quantityOnHand from Item where itemId =:itemId")
    Object getItemDetails(@Param("itemId")String itemId);

    @Modifying(clearAutomatically = true)
    @Query(value = "update item set quantity_on_hand=:finalQuantity where item_id=:itemId",nativeQuery = true)
    void updateQty(@Param("finalQuantity")double finalQuantity, @Param("itemId")String itemId);

    @Query(value = "select mm.modelName,mm.makeName from MakeModel mm,MakeModelDetails mmd where mm.makeModelId=mmd.makeModel.makeModelId and  mmd.item.itemId =:itemId order by mm.makeName")
    List<Object [] > viewMakeModelDetailsForThisItem(@Param("itemId")String itemId);
}
