package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;
    private String itemName;
    private double quantityOnHand;
    private double quantityOfPrice;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "item")
    @OnDelete(action = OnDeleteAction.CASCADE)
    //@JsonIgnore
    private Set<MakeModelDetails> makeModelDetails;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "item")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Set<StockItemDetails> stockItemDetails;

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {

        System.out.println("Item Id Is Set");
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public double getQuantityOnHand() {
        return quantityOnHand;
    }

    public void setQuantityOnHand(double quantityOnHand) {
        this.quantityOnHand = quantityOnHand;
    }

    public double getQuantityOfPrice() {
        return quantityOfPrice;
    }

    public void setQuantityOfPrice(double quantityOfPrice) {
        this.quantityOfPrice = quantityOfPrice;
    }

    public Set<MakeModelDetails> getMakeModelDetails() {
        return makeModelDetails;
    }

    public void setMakeModelDetails(Set<MakeModelDetails> makeModelDetails) {

        for (MakeModelDetails i: makeModelDetails
        ) {
            i.setItem(this);
        }
        this.makeModelDetails = makeModelDetails;
    }

    public Set<StockItemDetails> getStockItemDetails() {
        return stockItemDetails;
    }

    public void setStockItemDetails(Set<StockItemDetails> stockItemDetails) {



        this.stockItemDetails = stockItemDetails;
    }
}
