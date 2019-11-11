package lk.vsc.repository;

import lk.vsc.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item,Integer> {

    @Query(value = "from Item where itemName Like CONCAT('%',?1,'%')")
    Item getItemNames(String itemName);

    @Query(value = "select itemName,itemId,quantityOnHand,stockLevel,itemQuantityType from Item where itemId Like CONCAT('%',:itemName,'%')")
    List<Object [] > getItemsToArray(@Param("itemName")String itemName);
}
