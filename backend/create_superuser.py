import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "watan_logistics.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
email = "admin@watanlogistics.com"
password = "admin"

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password)
    print(f"Superuser created: {email} / {password}")
else:
    print("Superuser already exists")
