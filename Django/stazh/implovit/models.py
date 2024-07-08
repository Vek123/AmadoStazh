import os
import shutil

from django.db import models

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


class ProductImages(models.Model):
    def upload_to(instance, filename):
        return 'images/catalog/%s/%s' % (instance.product.title, filename)

    product = models.ForeignKey(Medicines, related_name="images", on_delete=models.CASCADE, verbose_name="Продукт")
    image = models.ImageField(upload_to=upload_to, verbose_name="Картинка")
    caption = models.CharField(max_length=255, blank=True, verbose_name="Название картинки")

    def __str__(self):
        return f"{self.product.title}" or self.caption

    def delete(self, using=None, keep_parents=False):
        path = f"{settings.MEDIA_ROOT}\\{self.image.name}".replace("/", "\\")
        if os.path.exists(path):
            os.remove(path)
        super().delete(using=using, keep_parents=keep_parents)

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        path = f"{settings.MEDIA_ROOT}\\{ProductImages.objects.get(pk=self.pk).image.name}".replace("/", "\\")
        if os.path.exists(path):
            os.remove(path)
        super().save(force_insert=False, force_update=force_update, using=using, update_fields=update_fields)

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Изображения продукта"
