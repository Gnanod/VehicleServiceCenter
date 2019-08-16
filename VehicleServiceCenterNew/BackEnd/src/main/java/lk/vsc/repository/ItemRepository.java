package lk.vsc.repository;

import lk.vsc.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item,Integer> {

    @Query(value = "from Item where itemName=?1")
    Item getItemNames(String itemName);

}
