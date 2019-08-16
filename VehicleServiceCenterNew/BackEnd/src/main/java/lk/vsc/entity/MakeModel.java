package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class MakeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int makeModelId;
    private String modelName;
    private String makeName;

    @OneToMany( mappedBy = "makeModel")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Set<MakeModelDetails> makeModelDetails;

    public int getMakeModelId() {
        return makeModelId;
    }

    public void setMakeModelId(int makeModelId) {
        this.makeModelId = makeModelId;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getMakeName() {
        return makeName;
    }

    public void setMakeName(String makeName) {
        this.makeName = makeName;
    }

    public Set<MakeModelDetails> getMakeModelDetails() {
        return makeModelDetails;
    }

    public void setMakeModelDetails(Set<MakeModelDetails> makeModelDetails) {
        this.makeModelDetails = makeModelDetails;
    }
}
