package lk.vsc.service.impl;

import lk.vsc.entity.Item;
import lk.vsc.entity.MakeModel;
import lk.vsc.entity.MakeModelDetails;
import lk.vsc.repository.ItemRepository;
import lk.vsc.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    @Transactional
    public Item addItem(Item item) {

        return  itemRepository.save(item);

    }

    @Override
    public Item getItems(String itemName) {

        return itemRepository.getItemNames(itemName);
    }

    @Override
    public List<Item> getItemsToArray(String itemName) {
        List<Object []> ob = itemRepository.getItemsToArray(itemName);

        List<Item> item1 = new ArrayList<>();

        for (Object s2[] :ob
             ) {

            Item i = new Item();
            i.setItemName(s2[0].toString());
            i.setItemId(Integer.parseInt(s2[1].toString()));
            i.setQuantityOnHand(Double.parseDouble(s2[2].toString()));


            item1.add(i);
        }

        return item1;

    }

}
