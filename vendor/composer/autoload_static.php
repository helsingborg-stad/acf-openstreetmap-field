<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitac9793f2566825634f7b9eaf0bff3fab
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'AcfOpenStreetMap\\' => 17,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'AcfOpenStreetMap\\' => 
        array (
            0 => __DIR__ . '/../..' . '/source/php',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitac9793f2566825634f7b9eaf0bff3fab::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitac9793f2566825634f7b9eaf0bff3fab::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitac9793f2566825634f7b9eaf0bff3fab::$classMap;

        }, null, ClassLoader::class);
    }
}
