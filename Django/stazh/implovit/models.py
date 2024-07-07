from django.db import models

# Create your models here.


class Categories(models.Model):
    title = models.CharField(max_length=50, verbose_name="Название")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Medicines(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    description = models.CharField(max_length=255, verbose_name="Описание", blank=True)
    information = models.TextField(verbose_name="Информация о товаре")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата последнего обновления")
    categories = models.ManyToManyField(Categories, related_name="products")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Медицина"
        verbose_name_plural = "Медицина"


class ProductImage(models.Model):
    def upload_to(instance, filename):
        return 'images/catalog/%s/%s' % (instance.promeduct.title, filename)

    product = models.ForeignKey(Medicines, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_to)
    caption = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.product.title} image" or self.caption

    class Meta:
        verbose_name = "Изображение продукта"
        verbose_name_plural = "Изображения продукта"
