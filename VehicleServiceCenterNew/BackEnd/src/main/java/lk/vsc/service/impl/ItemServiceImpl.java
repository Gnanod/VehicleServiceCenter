package lk.vsc.service.impl;

import lk.vsc.DTO.MakeModelDetailsDTO;
import lk.vsc.entity.Item;
import lk.vsc.repository.ItemRepository;
import lk.vsc.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

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

        if(ob.size()==0){

            item1 = null;

        }else{


            for (Object s2[] :ob
            ) {

                Item i = new Item();
                i.setItemName(s2[0].toString());
                i.setItemId(s2[1].toString());
                i.setQuantityOnHand(Double.parseDouble(s2[2].toString()));
                i.setStockLevel(Double.parseDouble(s2[3].toString()));
                i.setItemQuantityType(s2[4].toString());

                item1.add(i);
            }
        }



        return item1;

    }

    @Override
    public List<Item> getAllItems() {

        List<Item> l1 = itemRepository.findAll();
        for (Item i:l1
             ) {
            System.out.println("HHHH"+i.getMakeModelDetails());
        }
        return itemRepository.findAll();
    }

    @Override
    public List<MakeModelDetailsDTO> viewMakeModelDetailsForThisItem(String itemId) {
        List<Object []> ob= itemRepository.viewMakeModelDetailsForThisItem(itemId);

        List<MakeModelDetailsDTO> m = new ArrayList<>();
        for (Object s2[] :ob
        ) {

            MakeModelDetailsDTO i = new MakeModelDetailsDTO();
            i.setModelName(s2[0].toString());
            i.setMakeName(s2[1].toString());


            m.add(i);
        }
        return m;
    }

}
