package com.bootcamp.backendintegrador.models;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "addresses")
public class AddressesModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Street name is required")
    @NotBlank(message = "Street name must be complete")
    @Column(name = "street_name", nullable = false)
    private String streetName;

    @NotNull(message = "Street number is required")
    @Column(name = "street_number", nullable = false)
    private Integer streetNumber;

    @NotNull(message = "Locality ID is required")
    @Column(name = "locality_id", nullable = false)
    private Integer localityId;

    @NotNull(message = "Supplier ID is required")
    @Column(name = "supplier_id", nullable = false)
    private Integer supplierId;

    @NotNull(message = "Postal code is required")
    @NotBlank(message = "Postal code must be complete")
    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    public AddressesModel() {

    }

    public AddressesModel(Integer id,
            String streetName,
            Integer streetNumber,
            Integer localityId,
            Integer supplierId,
            String postalCode,
            Timestamp createdAt, Timestamp updatedAt) {
        this.id = id;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.localityId = localityId;
        this.supplierId = supplierId;
        this.postalCode = postalCode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public Integer getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(Integer streetNumber) {
        this.streetNumber = streetNumber;
    }

    public Integer getLocalityId() {
        return localityId;
    }

    public void setLocalityId(Integer localityId) {
        this.localityId = localityId;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
}
