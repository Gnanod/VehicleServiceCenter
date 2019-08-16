package lk.vsc.service.impl;

import lk.vsc.entity.Item;
import lk.vsc.entity.MakeModel;
import lk.vsc.entity.MakeModelDetails;
import lk.vsc.repository.ItemRepository;
import lk.vsc.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

}
