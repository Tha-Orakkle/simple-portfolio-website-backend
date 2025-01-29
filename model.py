# Simple DB Schema implemented with django
from django.db import models
from django.contrib.auth.models import AbstractUser

import uuid

class User(AbstractUser):
    """This class represents the user model."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=64, unique=True)  
    password = models.CharField(max_length=128)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def save(self):
        self.set_password(self.password)
        super().save()
        return self

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "<User: {}>".format(self.email)

   
class Tasks(models.Model):
    """This class represents the task model."""
    choices = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, blank=False, unique=True)
    status = models.CharField(max_length=255, blank=False, choices=choices, default='pending')
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        """Return a human readable representation of the model instance."""
        return "<Task: {}>".format(self.title)
    