package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Item {

    @Id
    private String itemId;
    private String itemName;
    private double quantityOnHand;
    private double quantityOfPrice;
    private double stockLevel;

    private String itemQuantityType;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "item")
    @OnDelete(action = OnDeleteAction.CASCADE)
    //@JsonIgnore
    private Set<MakeModelDetails> makeModelDetails;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "item")
    @OnDelete(action = OnDeleteAction.CASCADE)
  //  @JsonIgnore
    private Set<StockItemDetails> stockItemDetails;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "item")
    @OnDelete(action = OnDeleteAction.CASCADE)
    //@JsonIgnore
    private List<JobOrderItemDetails> jobOrderItemDetails;

    public String getItemId() {
        return itemId;
    }



    public void setItemId(String itemId) {

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

    public List<JobOrderItemDetails> getJobOrderItemDetails() {
        return jobOrderItemDetails;
    }

    public void setJobOrderItemDetails(List<JobOrderItemDetails> jobOrderItemDetails) {
        this.jobOrderItemDetails = jobOrderItemDetails;
    }

    public double getStockLevel() {
        return stockLevel;
    }

    public void setStockLevel(double stockLevel) {
        this.stockLevel = stockLevel;
    }

    public String getItemQuantityType() {
        return itemQuantityType;
    }

    public void setItemQuantityType(String itemQuantityType) {
        this.itemQuantityType = itemQuantityType;
    }
}
