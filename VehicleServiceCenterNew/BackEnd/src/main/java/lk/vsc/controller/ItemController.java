package lk.vsc.controller;

import lk.vsc.entity.Item;
import lk.vsc.entity.MakeModel;
import lk.vsc.entity.MakeModelDetails;
import lk.vsc.entity.Supplier;
import lk.vsc.service.ItemService;
import lk.vsc.service.MakeModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/ItemController")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping(value = "/addItemDB")
    public Item addItem(@RequestBody Item item){

        System.out.println("GGG"+item.getStockLevel());
        Set<MakeModelDetails> l1 = item.getMakeModelDetails();

        return  itemService.addItem(item);

    }

    @GetMapping(value = "/getItemDetailsByName/{itemName}")
    public Item getItems(@PathVariable String itemName){

        Item i = itemService.getItems(itemName);
        System.out.println("JJJJJJJJJ"+i.getStockLevel());
        return itemService.getItems(itemName);
    }

    @GetMapping(value = "/getItemDetailsByNameToArray/{itemName}")
    public List<Item> getItemsToArray(@PathVariable String itemName){

        List<Item> i = itemService.getItemsToArray(itemName);

        return itemService.getItemsToArray(itemName);
    }

}
