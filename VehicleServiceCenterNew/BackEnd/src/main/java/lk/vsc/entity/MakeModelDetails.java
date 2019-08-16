package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class MakeModelDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int makeModelDetailID;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MakeModel makeModel;

    @ManyToOne
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Item item;

    public int getMakeModelDetailID() {
        return makeModelDetailID;
    }

    public void setMakeModelDetailID(int makeModelDetailID) {
        this.makeModelDetailID = makeModelDetailID;
    }

    public MakeModel getMakeModel() {
        return makeModel;
    }

    public void setMakeModel(MakeModel makeModel) {
        this.makeModel = makeModel;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
