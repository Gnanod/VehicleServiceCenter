package lk.vsc.controller;

import lk.vsc.DTO.ViewItemStockDTO;
import lk.vsc.entity.Item;
import lk.vsc.entity.MakeModelDetails;
import lk.vsc.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping(value = "/getAllItems")
    public List<ViewItemStockDTO> getAllItems(){

        List<Item> l1 = itemService.getAllItems();
        List<ViewItemStockDTO> v1 = new ArrayList<>();
        for ( Item l2:l1
             ) {
            ViewItemStockDTO v3 = new ViewItemStockDTO();
            v3.setItemCode(l2.getItemId());
            v3.setItemName(l2.getItemName());
            v3.setCurrentQty(Double.toString(l2.getQuantityOnHand()));
            v3.setQuantityType(l2.getItemQuantityType());
            v3.setQtyPrice(Double.toString(l2.getQuantityOfPrice()));
            v1.add(v3);
        }

        return v1;
    }

}
