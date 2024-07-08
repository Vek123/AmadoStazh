from rest_framework import serializers

from implovit.models import *


class ProductImagesSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        representation = super(ProductImagesSerializer, self).to_representation(instance)
        image_value = representation.pop('image')
        return image_value

    class Meta:
        model = ProductImages
        fields = ["image"]


class ProductTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductTags
        fields = ["name"]


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ["title"]


class MedicineBasicSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()
    tag = serializers.StringRelatedField(read_only=True)
    categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = Medicines
        fields = ["id", "title", "description", "categories", "tag", "images"]

    def get_images(self, obj):
        images = obj.images.all()
        return ProductImagesSerializer(images, many=True).data
