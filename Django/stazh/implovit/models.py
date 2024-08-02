import os
import shutil

from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_delete

from stazh import settings


# Create your models here.


class Categories(models.Model):
    title = models.CharField(max_length=50, verbose_name="Название")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class ProductTags(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Тег"
        verbose_name_plural = "Теги"


class Medicines(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    description = models.CharField(max_length=255, verbose_name="Описание", blank=True)
    information = models.TextField(verbose_name="Информация о товаре")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата последнего обновления")
    categories = models.ManyToManyField(Categories, related_name="products")
    tag = models.ForeignKey(ProductTags, related_name="products", blank=True, null=True, default=None, on_delete=models.RESTRICT)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Медицина"
        verbose_name_plural = "Медицина"


def upload_to(instance, filename):
    return 'images/catalog/%s/%s' % (instance.product.title, filename)


class ProductImages(models.Model):

    product = models.ForeignKey(Medicines, related_name="images", on_delete=models.CASCADE, verbose_name="Продукт")
    image = models.ImageField(upload_to=upload_to, verbose_name="Картинка")
    caption = models.CharField(max_length=255, blank=True, verbose_name="Название картинки")

    def __str__(self):
        return f"{self.product.title}" or self.caption

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        try:
            old_version = ProductImages.objects.get(pk=self.pk).image
            path = f"{settings.MEDIA_ROOT}\\{old_version.name}".replace("/", "\\")
            if os.path.exists(path) and old_version != self.image:
                os.remove(path)
        except ProductImages.DoesNotExist:
            pass
        super().save(force_insert=False, force_update=force_update, using=using, update_fields=update_fields)

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Изображения продукта"


# @receiver(pre_delete, sender=ProductImages)
# def delete_apartment_image(sender: ProductImages, instance: ProductImages, **kwargs) -> None:
#     instance.image.delete(False)
