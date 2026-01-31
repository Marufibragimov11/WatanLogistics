# from pathlib import Path
# import os
# import dj_database_url

# from dotenv import load_dotenv


# load_dotenv()

# BASE_DIR = Path(__file__).resolve().parent.parent

# SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-replace-me-in-production')

# # DEBUG = os.getenv('DEBUG', 'True') == 'True'
# DEBUG = False

# ALLOWED_HOSTS = ['*']

# INSTALLED_APPS = [
#     'django.contrib.admin',
#     'django.contrib.auth',
#     'django.contrib.contenttypes',
#     'django.contrib.sessions',
#     'django.contrib.messages',
#     'cloudinary_storage',
#     'django.contrib.staticfiles',
#     'cloudinary',

#     # Third Party
#     'rest_framework',
#     'rest_framework.authtoken',
#     'corsheaders',
#     'django_filters',

#     # Local Apps
#     'accounts',
#     'dashboard',
#     'core',
#     'fleet',
#     'drivers',
#     'dispatch',
#     'load_history',
# ]


# MIDDLEWARE = [
#     'corsheaders.middleware.CorsMiddleware',  # CORS first
#     'django.middleware.security.SecurityMiddleware',
#     'whitenoise.middleware.WhiteNoiseMiddleware',
#     'django.contrib.sessions.middleware.SessionMiddleware',
#     'django.middleware.common.CommonMiddleware',
#     'django.middleware.csrf.CsrfViewMiddleware',
#     'django.contrib.auth.middleware.AuthenticationMiddleware',
#     'django.contrib.messages.middleware.MessageMiddleware',
#     'django.middleware.clickjacking.XFrameOptionsMiddleware',
# ]

# ROOT_URLCONF = 'watan_logistics.urls'

# TEMPLATES = [
#     {
#         'BACKEND': 'django.template.backends.django.DjangoTemplates',
#         'DIRS': [],
#         'APP_DIRS': True,
#         'OPTIONS': {
#             'context_processors': [
#                 'django.template.context_processors.debug',
#                 'django.template.context_processors.request',
#                 'django.contrib.auth.context_processors.auth',
#                 'django.contrib.messages.context_processors.messages',
#             ],
#         },
#     },
# ]

# WSGI_APPLICATION = 'watan_logistics.wsgi.application'

# # DATABASES = {
# #     'default': {
# #         'ENGINE': 'django.db.backends.postgresql',
# #         'NAME': 'watan_db',
# #         'USER': 'postgres',
# #         'PASSWORD': '6711',
# #         'HOST': '127.0.0.1',
# #         'PORT': '5432',
# #     }
# # }

# DATABASES = {
#     'default': dj_database_url.config(
#         default=os.environ.get('DATABASE_URL'),
#         conn_max_age=600
#     )
# }

# AUTH_PASSWORD_VALIDATORS = [
#     {
#         'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
#     },
#     {
#         'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
#     },
# ]

# LANGUAGE_CODE = 'en-us'

# TIME_ZONE = 'UTC'

# USE_I18N = True

# USE_TZ = True


# STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
# STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
# MEDIA_URL = '/media/'
# MEDIA_ROOT = BASE_DIR / 'media'
# DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# CLOUDINARY_STORAGE = {
#     'CLOUD_NAME': 'dtgvhvrox',
#     'API_KEY': '18183492474536',
#     'API_SECRET': '9D5LYZiuSxdoV-tlEXWKR0RfC9w',
# }
# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# AUTH_USER_MODEL = 'accounts.User'

# CORS_ALLOW_ALL_ORIGINS = True  # For dev only

# # This allows the Admin login to work on Railway
# CSRF_TRUSTED_ORIGINS = ['https://*.railway.app']

# REST_FRAMEWORK = {
#     'DEFAULT_PERMISSION_CLASSES': [
#         'rest_framework.permissions.IsAuthenticated',
#     ],
#     'DEFAULT_AUTHENTICATION_CLASSES': [
#         'rest_framework.authentication.TokenAuthentication',
#         'rest_framework.authentication.SessionAuthentication',
#         'rest_framework.authentication.BasicAuthentication',
#     ],
# }

from pathlib import Path
import os
import dj_database_url
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-replace-me-in-production')
DEBUG = False 
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'storages', # Required for Amazon S3
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'django_filters',
    'accounts',
    'dashboard',
    'core',
    'fleet',
    'drivers',
    'dispatch',
    'load_history',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'watan_logistics.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'watan_logistics.wsgi.application'

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600
    )
}

# --- STATIC FILES (WhiteNoise) ---
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# --- MEDIA FILES (Amazon S3) ---
# Replacing Cloudinary with S3 storage backend
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = 'us-east-1' # Update this to your bucket's region
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_DEFAULT_ACL = 'public-read'

# This ensures your frontend gets the full Amazon URL for images
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'

# --- OTHER SETTINGS ---
AUTH_USER_MODEL = 'accounts.User'
CORS_ALLOW_ALL_ORIGINS = True 
CSRF_TRUSTED_ORIGINS = ['https://*.railway.app', 'https://*.vercel.app']
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': ['rest_framework.permissions.IsAuthenticated'],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
}